import React from 'react'
import '../styles/components/userInfoPrompt.css'

function UserInfoInput({ user, onConfirm, setDisplay }) {
  // let userInfo = {
  //   name: {
  //     firstName: user.name.firstName,
  //     lastName: user.name.lastName
  //   },
  //   stats: {
  //     height: user.stats.height,
  //     weight: user.stats.weight,
  //     age: user.stats.age
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    let formJson = Object.fromEntries(formData.entries());

    try {
      formJson = {
        ...formJson,
        height: parseInt(formJson.height),
        weight: parseInt(formJson.weight),
        age: parseInt(formJson.age)
      }
    } catch (e) {
      console.log("err =", e)
      alert("Invalid form input: height, weight, age must be positive numbers")
    }

    let newUserInfo = {
      name: {
        firstName: formJson.firstName,
        lastName: formJson.lastName
      },
      stats: {
        height: formJson.height,
        weight: formJson.weight,
        age: formJson.age
      }
    }

    onConfirm(newUserInfo)
    setDisplay(false)
  }

  return (
    <div className="user-info-prompt-wrapper">
      <div className="user-info-prompt">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="firstName">First Name*</label>
          <input type="text" name="firstName" id="firstName" required defaultValue={user.name.firstName ? user.name.firstName : ''} />

          <label htmlFor="lastName">Last Name*</label>
          <input type="text" name="lastName" id="lastName" required defaultValue={user.name.lastName ? user.name.lastName : ''}/>

          <label htmlFor="height">Height (cm)</label>
          <input type="number" name="height" id="height" min="0" defaultValue={user.stats.height ? user.stats.height : ''}/>

          <label htmlFor="weight">Weight (kg)</label>
          <input type="number" name="weight" id="weight" min="0" defaultValue={user.stats.weight ? user.stats.weight : ''}/>

          <label htmlFor="age">Age</label>
          <input type="number" name="age" id="age" min="0" defaultValue={user.stats.age ? user.stats.age : ''}/>
          
          <button type="submit">Update Info</button>
          <button type="button" onClick={() => setDisplay(false)}>Close</button>
        </form>
      </div>
    </div>
  )
}

export default UserInfoInput