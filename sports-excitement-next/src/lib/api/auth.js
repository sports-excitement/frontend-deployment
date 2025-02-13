// This file contains the API function for user and authentication related calls. 

export async function CreateUserAPICall(NewUser) {
    const response = await fetch('https://createuser-7kxcqhkasa-uc.a.run.app', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify(NewUser)
    });
    return response
}

