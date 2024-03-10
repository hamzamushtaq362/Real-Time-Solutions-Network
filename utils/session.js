export const setSessionData = (key, data) => {
  const dataType = typeof data;
  if (dataType === 'object') sessionStorage.setItem(key, JSON.stringify(data));
  else sessionStorage.setItem(key, data);
};

export const getSessionData = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch {
    return sessionStorage.getItem(key);
  }
};

export const removeSessionData = (key) => {
  return sessionStorage.removeItem(key);
};

export const clearSessionData = () => sessionStorage.clear();

export const pushToSessionData = (key, newData) => {
  const currentData = getSessionData(key);

  if (Array.isArray(currentData)) {
    currentData.push(newData);
    setSessionData(key, currentData);
  } else {
    setSessionData(key, [newData]);
  }
};
