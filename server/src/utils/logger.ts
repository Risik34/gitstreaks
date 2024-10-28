const customlogger = (message: string, ...rest: string[]) => {
  if (process.env.ENVIRONMENT == 'DEVELOPMENT') {
    console.log(message, ...rest);
  }

  console.log(...rest);
};

export default customlogger;
