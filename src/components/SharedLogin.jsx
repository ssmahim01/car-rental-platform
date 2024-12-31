const SharedLogin = ({handleGoogleLogin}) => {
    return (
        <div className="w-11/12 mx-auto">
            <button onClick={handleGoogleLogin} className="btn btn-outline rounded-full border border-gray-300 shadow-md text-success text-lg w-full font-bold mb-5 hover:bg-green-500 hover:border-none">Log In with Google</button>
        </div>
    );
};

export default SharedLogin;