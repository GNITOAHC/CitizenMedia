import React from 'react'

export default function Account() {
  const [password, setPassword] = React.useState<string>('')
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>('')

  // TODO: implement reset password
  const resetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      window.alert('Passwords do not match')
      return
    } else {
      window.alert(
        `Password reset (not really)\n ${password} -> ${newPassword}`
      )
      return
    }
  }

  return (
    <section className="flex flex-col">
      <section>
        <p>E-Mail</p>
      </section>
      <section>
        <p>Reset Password (unimplemented)</p>
        <div>
          <input
            type="password"
            placeholder="current password"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="new password"
            className="input input-bordered"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm new password"
            className="input input-bordered"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button className="btn" onClick={() => resetPassword()}>
            Confirm
          </button>
        </div>
      </section>
      <hr />
      <section>
        <p>Deactivate account (suspend your account until you sign back in)</p>
      </section>
      <section>
        <p>Delete account</p>
      </section>
    </section>
  )
}
