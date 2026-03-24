const logger = (store) => (next) => (action) => {
  console.log('Dispatching Action:', action.type);
  console.log('Payload:', action.payload);

  const prevState = store.getState();
  console.log('State Before:', prevState);

  const result = next(action);

  const nextState = store.getState();
  console.log('State After:', nextState);

  return result;
};

export default logger;