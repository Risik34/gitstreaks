const customlogger = (message: string | object, ...rest: string[]) => {
  if (process.env.ENVIRONMENT == 'DEVELOPMENT') {
    console.log(message, ...rest);
  }

  console.log(...rest);
};

export default customlogger;
