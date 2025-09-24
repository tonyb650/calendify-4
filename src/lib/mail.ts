import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY) 

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const emailVerificationLink = `${process.env.AUTH_URL}/auth/new-verification?token=${token}`

  await resend.emails.send({
    from: "noreply@calendify.dev",
    to: email,
    subject: "Calendify: Verify your email address",
    html: `<p><a href="${emailVerificationLink}">Click here to confirm email.</a></p>`,
    text: `Follow this link to confirm your email address: ${emailVerificationLink}`,
  })
}