


export const userValidateEmail = async request => {
  const { code } = request.params;
  const requests =
    await
      Servable.Services.call({
        id: 'com.@servable-community.userequestable.requestsPerRate',
        params: {
          code,
          type: 'validateEmail'
        }
      })

  if (requests > process.env.EMAILABLE_RESET_REQUESTS_MAX_RATE) {
    return new Error(
      "You have requested an email reset too many times. Please wait until tomorrow."
    );
  }

  return Servable.Services.call({
    id: 'com.@servable-community.userequestable.redeemCode',
    params: {
      code,
    }
  })
}
