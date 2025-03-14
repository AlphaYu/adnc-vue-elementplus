<template>
  <div class="app-container">
    <div class="search-bar">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="queryParams.keywords"
            placeholder="登录账号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="createTime" label="登录时间">
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
        <el-table-column label="登录时间" prop="createTime" width="140" />
        <el-table-column label="登录Id" prop="userId" width="140" />
        <el-table-column label="登录账号" prop="account" width="100" />
        <el-table-column label="登录人" prop="name" width="100" />
        <el-table-column label="状态码" prop="statusCode" width="80" />
        <el-table-column label="设备" prop="device" width="100" />
        <el-table-column label="日志内容" prop="message" min-width="200" show-overflow-tooltip />
        <el-table-column label="IP 地址" prop="remoteIpAddress" width="150" />
        <el-table-column label="成功" prop="succeed" width="80" />
        <el-table-column label="执行时间(ms)" prop="executionTime" width="100" />
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
  name: "LoginLog",
  inheritAttrs: false,
});

import LogAPI, { LogPageQuery, LoginLogPageVO } from "@/api/maint/log";

const queryFormRef = ref();

const loading = ref(false);
const total = ref(0);

const queryParams = reactive<LogPageQuery>({
  pageIndex: 1,
  pageSize: 10,
  keywords: "",
  createTime: ["", ""],
});

// 日志表格数据
const pageData = ref<LoginLogPageVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  LogAPI.getLoginLogPage(queryParams)
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
