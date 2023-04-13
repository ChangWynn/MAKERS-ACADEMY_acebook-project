import React from 'react';

export const EmailForm = ({changeEmail}) => {
  return (
    <>
      <form id='email-form' onSubmit={changeEmail}>
        <input placeholder="New Email" id="email" className="form-field"type='text'/>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export const UsernameForm = () => {
  return (
    <>
      <form id='username-form'>
        <input placeholder="New username" id="username" className="form-field"type='text'/>
        <button type="submit">Save</button>
      </form>
    </>
  )
}

export const PasswordForm = () => {
  return (
    <>
      <form id='password-form'>
        <input placeholder="Current password" id="curr-password" className="form-field"type='text'/>
        <input placeholder="New password" id="new-password" className="form-field"type='text'/>
        <button type="submit">Save</button>
      </form>
      <button >Forgot password?</button>
    </>
  )
}

export const AvatarForm = ({profilePicture}) => {
  return (
    <>
      <form id='username-form'>
            <div id="signup-profile-pic-upload-container">
            <div id="signup-profile-pic-upload-icon">
              <input id="profilePicture" className="form-field" type="file" accept=".png, .jpg, .jpeg" />
              <i className="fa-regular fa-image fa-3x"></i>
            </div>
            <div>
              {<p className='signup-photo-filename'>{profilePicture ? profilePicture.name : "No file chosen"}</p> }
            </div>
            </div>
        <button type="submit">Save</button>
      </form>
    </>
  )
}
