// 封裝本地存儲模塊

// 存儲數據
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 獲取數據
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 刪除數據
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
