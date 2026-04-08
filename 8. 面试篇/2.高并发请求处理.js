// 并发池工具函数（通用版）
async function requestPool(tasks, maxConcurrency) {
  const results = [];
  const executing = new Set(); // 使用 Set 便于删除操作

  for (const task of tasks) {
    // 创建请求Promise（task是返回Promise的请求函数）
    const promise = task();
    results.push(promise);

    // 用 wrapped 包装，完成后自动从 executing 中移除
    const wrapped = promise.finally(() => executing.delete(wrapped));
    executing.add(wrapped);

    // 当并发数达到阈值，等待任意一个请求完成后再继续
    if (executing.size >= maxConcurrency) {
      await Promise.race(executing);
    }
  }

  // 等待所有请求完成（无论成功失败）
  return Promise.allSettled(results);
}

// 用法示例
const requests = Array.from({ length: 100 }, (_, i) =>
  () => fetch(`/api/data?index=${i}`) // 每个task是一个请求函数（延迟执行）
);

// 控制最大并发数为8（根据服务器抗压能力调整，建议5-10）
requestPool(requests, 8).then(results => {
  // 处理成功/失败结果
  const successData = results.filter(r => r.status === 'fulfilled').map(r => r.value);
});