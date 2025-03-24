<template>
  <div class="app-container">
    <div class="search-bar">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="keywords" label="关键字">
          <el-input
            v-model="queryParams.keywords"
            placeholder="方法名"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item prop="createTime" label="操作时间">
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
        <el-table-column label="操作时间" prop="createTime" width="170" />
        <el-table-column label="操作账号" prop="account" width="100" />
        <el-table-column label="操作人" prop="name" width="100" />
        <el-table-column label="类" prop="className" width="200" show-overflow-tooltip />
        <el-table-column label="方法" prop="method" width="200" show-overflow-tooltip />
        <el-table-column label="方法名" prop="logName" width="120" />
        <el-table-column label="日志内容" prop="message" min-width="180" show-overflow-tooltip />
        <el-table-column label="IP 地址" prop="remoteIpAddress" width="120" />
        <el-table-column label="成功" prop="succeed" width="80" />
        <el-table-column label="时间(ms)" prop="executionTime" width="100" />
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
  name: "OperateLog",
  inheritAttrs: false,
});

import LogAPI, { LogPageVO, LogPageQuery } from "@/api/maint/log";

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
const pageData = ref<LogPageVO[]>();

/** 查询 */
function handleQuery() {
  loading.value = true;
  LogAPI.getOperationLogPage(queryParams)
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
