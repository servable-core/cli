import validator from "email-validator";

export const userRequestValidateEmail = async request => {
  const { email, locale } = request.params
  if (!email || !validator.validate(email)) {
    throw new Error("Please provide an email.")
  }

  const requests =
    await
      Servable.Services.call({
        id: 'com.@servable-community.userequestable.requestsPerRate',
        params: {
          email,
          type: 'validateEmail'
        }
      })


  if (requests > process.env.EMAILABLE_RESET_REQUESTS_MAX_RATE) {
    throw new Error(
      "You have requested an email validation code too many times. Please wait until tomorrow."
    )
  }

  const user = null
  const { object, code } = await
    Servable.Services.call({
      id: 'com.@servable-community.userequestable.create',
      params: {
        user,
        email,
        type: 'validateEmail'
      }
    })

  await Servable.Services.call({
    id: 'com.@servable-community.message',
    params: {
      to: [{ email, locale }],
      channel: 'email',
      templateId: "codevalidation",
      data: {
        code,
        useBefore: ""
      }
    }
  })

  await
    Servable.Services.call({
      id: 'com.@servable-community.userequestable.updateSent',
      params: {
        object,
      }
    })
}
