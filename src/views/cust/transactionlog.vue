<template>
  <div class="app-container">
    <div class="search-bar">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="queryParams.keywords"
            placeholder="客户账号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="createTime" label="创建时间">
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
      <el-table v-loading="loading" :data="pageData" highlight-current-row border>
        <el-table-column label="id" prop="id" min-width="100" />
        <el-table-column label="客户Id" prop="customerId" min-width="100" />
        <el-table-column label="客户账号" prop="account" />
        <el-table-column label="变动类型" prop="exchangeTypeName" />
        <el-table-column label="变动状态" prop="exchageStatusName" />
        <el-table-column label="变动金额" prop="changingAmount" />
        <el-table-column label="充值金额" prop="amount" />
        <el-table-column label="变动后的金额" prop="changedAmount" />
        <el-table-column label="创建时间" prop="createTime" />
      </el-table>

      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageIndex"
        v-model:limit="queryParams.pageSize"
        @pagination="handleQuery"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "TransactionLog",
  inheritAttrs: false,
});

import CustAPI, { TransactionLogPageQuery, TransactionLogVO } from "@/api/cust/";

const queryFormRef = ref();

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<TransactionLogPageQuery>({
  pageIndex: 1,
  pageSize: 10,
});

// 日志表格数据
const pageData = ref<TransactionLogVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  CustAPI.getTransactionLogsPage(queryParams)
    .then((data) => {
      pageData.value = data.list;
      total.value = data.total;
    })
    .finally(() => {
      loading.value = false;
    });
}
/** 重置查询 */
function handleResetQuery() {
  queryFormRef.value.resetFields();
  queryParams.pageIndex = 1;
  queryParams.createTime = undefined;
  handleQuery();
}

onMounted(() => {
  handleQuery();
});
</script>
