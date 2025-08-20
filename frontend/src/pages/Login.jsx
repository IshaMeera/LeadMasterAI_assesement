import React, {useState} from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError('');

        try{
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            if(!res.ok){
                const errData = await res.json();
                throw new Error(errData.message || 'Login failed');
            }
            const data = await res.json();
            console.log('Login successful:', data);

            localStorage.setItem('token', data.token);
            alert(`Login successful! Welcome back, ${data.user.name}!`);
            //window.location.href = '/dashboard';
        }catch(err){
            console.error('Error during login:', err);
            setError(err.message || 'An error occurred during login');
        }
    }
    
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  </div>
);

}

export default Login;