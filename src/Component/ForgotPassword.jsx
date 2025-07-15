import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate sending the password reset request

    if (email === "test@example.com") {
      setSuccMsg("Password reset link sent to your email!");
      setErrorMsg("");
    } else {
      setErrorMsg("Email not found!");
      setSuccMsg("");
    }

    // Reset the email field
    setEmail("");
  };

  return (
    <div className="container">
      <div className="row">
        {/* Image Section */}
        <div className="col-md-6 p-5">
          <img
            className="card"
            alt="ecom"
            src="/ecom33.png"
            width="100%"
            height="350px"
          />
        </div>

        {/* Forgot Password Form */}
        <div className="col-md-5 p-5">
          <div className="card shadow-lg">
            <div className="card-header">
              <h3 className="text-center">Forgot Password</h3>

              {/* Success Message */}
              {succMsg && (
                <div className="card p-2 bg-success bg-opacity-10 text-center">
                  <span className="text-success fw-bold">{succMsg}</span>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="card p-2 bg-danger bg-opacity-10 text-center">
                  <span className="text-danger fw-bold">{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter email here"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <br />
                <button
                  type="submit"
                  className="btn btn-dark shadow col-md-6 offset-3"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
