<!-- 用户管理 -->
<template>
  <div class="app-container">
    <div class="search-bar">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item label="关键字" prop="keywords">
          <el-input
            v-model="queryParams.keywords"
            placeholder="账号"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item label="创建时间">
          <el-date-picker
            v-model="queryParams.createTime"
            :editable="false"
            class="!w-[240px]"
            type="daterange"
            range-separator="~"
            start-placeholder="开始时间"
            end-placeholder="截止时间"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="flex-x-between mb-10px">
        <div>
          <el-button
            v-hasPerm="['user-create']"
            type="success"
            icon="plus"
            @click="handleOpenDialog()"
          >
            新增
          </el-button>
        </div>
      </div>

      <el-table v-loading="loading" :data="pageData" @selection-change="handleSelectionChange">
        <!-<el-table-column type="selection" width="50" align="center" />
        <el-table-column label="用户名" prop="account" />
        <el-table-column label="昵称" align="center" prop="nickname" />
        <el-table-column label="姓名" align="center" prop="realname" />
        <el-table-column label="余额" align="center" prop="balance" />
        <el-table-column label="创建时间" align="center" prop="createTime" />
        <el-table-column label="操作" fixed="right" width="220">
          <template #default="scope">
            <el-button
              v-hasPerm="'customer-search-transactionlog'"
              type="primary"
              icon="RefreshLeft"
              size="small"
              link
              @click="hancleResetPassword(scope.row)"
            >
              充值
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageIndex"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>

    <!-- 用户表单 -->
    <el-drawer
      v-model="dialog.visible"
      :title="dialog.title"
      append-to-body
      @close="handleCloseDialog"
    >
      <el-form ref="customerFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="客户账号" prop="account">
          <el-input
            v-model="formData.account"
            :readonly="!!formData.id"
            placeholder="请输入客户账号"
          />
        </el-form-item>

        <el-form-item label="客户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入客户昵称" />
        </el-form-item>

        <el-form-item label="姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入姓名" maxlength="11" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
          <el-button @click="handleCloseDialog">取 消</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import CustAPI, { CustomerPageQuery, CustmerPageVO, CutomerForm } from "@/api/cust/";

defineOptions({
  name: "Customer",
  inheritAttrs: false,
});
const queryFormRef = ref();
const customerFormRef = ref();

const queryParams = reactive<CustomerPageQuery>({
  pageIndex: 1,
  pageSize: 10,
});

const pageData = ref<CustmerPageVO[]>();
const total = ref(0);
const loading = ref(false);

const dialog = reactive({
  visible: false,
  title: "新增客户",
});

const formData = reactive<CutomerForm>({
  id: 0,
});

const rules = reactive({
  account: [{ required: true, message: "客户账号不能为空", trigger: "blur" }],
  nickname: [{ required: true, message: "客户昵称不能为空", trigger: "blur" }],
  realname: [{ required: true, message: "客户姓名不能为空", trigger: "blur" }],
});

// 选中的用户ID
const selectIds = ref<number[]>([]);

// 查询
function handleQuery() {
  loading.value = true;
  CustAPI.getPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 重置查询
function handleResetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageIndex = 1;
  queryParams.createTime = undefined;
  handleQuery();
}

// 选中项发生变化
function handleSelectionChange(selection: any[]) {
  selectIds.value = selection.map((item) => item.id);
}

// 重置密码
function hancleResetPassword(row: CustmerPageVO) {
  ElMessageBox.prompt("请输入用户【" + row.account + "】的充值金额", "充值", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  }).then(
    ({ value }) => {
      if (!value) {
        ElMessage.warning("金额必须大于1，请重新输入");
        return false;
      }
      CustAPI.recharge(row.id, value as unknown as number).then(() => {
        ElMessage.success("充值成功，充值金额是：" + value);
        // handleResetQuery();
      });
    },
    () => {
      ElMessage.info("已取消充值");
    }
  );
}

/**
 * 打开弹窗
 *
 * @param id 用户ID
 */
async function handleOpenDialog() {
  //async function handleOpenDialog(id?: number) {
  dialog.visible = true;
  dialog.title = "新增客户";
}

// 关闭弹窗
function handleCloseDialog() {
  dialog.visible = false;
  customerFormRef.value.resetFields();
  customerFormRef.value.clearValidate();

  formData.id = 0;
}

// 提交用户表单（防抖）
const handleSubmit = useDebounceFn(() => {
  customerFormRef.value.validate((valid: boolean) => {
    if (valid) {
      const customerId = formData.id;
      loading.value = true;
      if (customerId) {
        CustAPI.update(customerId, formData)
          .then(() => {
            ElMessage.success("修改客户成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      } else {
        CustAPI.add(formData)
          .then(() => {
            ElMessage.success("新增客户成功");
            handleCloseDialog();
            handleResetQuery();
          })
          .finally(() => (loading.value = false));
      }
    }
  });
}, 1000);

onMounted(() => {
  handleQuery();
});
</script>
