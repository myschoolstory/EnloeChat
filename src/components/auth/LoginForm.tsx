import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './LoginForm.css';

export const LoginForm: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      if (isSignUp) {
        result = await signUp(email, password, nickname);
      } else {
        result = await signIn(email, password);
      }

      if (!result.success) {
        setError(result.error || 'An error occurred');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container" role="main" aria-label="Login page">
      <div className="login-card" role="region" aria-labelledby="login-title">
        <h1 id="login-title" className="login-title">EnloeChat</h1>
        <p className="login-subtitle" id="login-subtitle">
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </p>

        <form
          onSubmit={handleSubmit}
          className="login-form"
          role="form"
          aria-labelledby="login-subtitle"
          aria-describedby={error ? "login-error" : undefined}
        >
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              aria-describedby="email-help"
              aria-invalid={error ? "true" : "false"}
              autoComplete="email"
            />
            <span id="email-help" className="sr-only">
              Enter your email address to {isSignUp ? 'create an account' : 'sign in'}
            </span>
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="nickname">Nickname</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                disabled={isLoading}
                minLength={2}
                maxLength={32}
                aria-describedby="nickname-help"
                aria-invalid={error ? "true" : "false"}
                autoComplete="nickname"
              />
              <span id="nickname-help" className="sr-only">
                Choose a display name between 2 and 32 characters
              </span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              minLength={6}
              aria-describedby="password-help"
              aria-invalid={error ? "true" : "false"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
            <span id="password-help" className="sr-only">
              {isSignUp
                ? 'Create a password with at least 6 characters'
                : 'Enter your account password'
              }
            </span>
          </div>

          {error && (
            <div
              id="login-error"
              className="error-message"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={isLoading}
            aria-describedby={isLoading ? "loading-status" : undefined}
          >
            {isLoading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
          {isLoading && (
            <span id="loading-status" className="sr-only">
              Processing your request, please wait
            </span>
          )}
        </form>

        <div className="login-toggle">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="toggle-button"
            disabled={isLoading}
            aria-pressed={isSignUp}
            aria-describedby="toggle-help"
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Sign Up"
            }
          </button>
          <span id="toggle-help" className="sr-only">
            Switch between sign in and sign up modes
          </span>
        </div>
      </div>
    </div>
  );
};