import React, { useState, useEffect } from 'react';
import { testNewsAPI, getWorkingAPIKey } from '../utils/apiTest';

const ApiTest = () => {
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        const result = await testNewsAPI();
        setTestResult(result);
        setLoading(false);
    };

    const findWorkingKey = async () => {
        setLoading(true);
        const workingKey = await getWorkingAPIKey();
        setTestResult({ success: !!workingKey, apiKey: workingKey });
        setLoading(false);
    };

    useEffect(() => {
        runTest();
    }, []);

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h3>API Test Results</h3>
                </div>
                <div className="card-body">
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-2">Testing API...</p>
                        </div>
                    ) : testResult ? (
                        <div>
                            {testResult.success ? (
                                <div className="alert alert-success">
                                    <h4>✅ API is Working!</h4>
                                    <p>Found {testResult.articles?.length || 0} articles</p>
                                    {testResult.apiKey && (
                                        <p><strong>Working API Key:</strong> {testResult.apiKey}</p>
                                    )}
                                </div>
                            ) : (
                                <div className="alert alert-danger">
                                    <h4>❌ API Error</h4>
                                    <p>{testResult.error}</p>
                                    <hr />
                                    <h5>Solutions:</h5>
                                    <ol>
                                        <li><strong>Get your own API key:</strong> Visit <a href="https://newsapi.org/register" target="_blank" rel="noopener noreferrer">NewsAPI.org</a> and register for a free API key</li>
                                        <li><strong>Check the error:</strong> The current API key might be expired or have reached its limit</li>
                                        <li><strong>Environment variable:</strong> Create a <code>.env</code> file with <code>REACT_APP_NEWS_API_KEY=your_key_here</code></li>
                                    </ol>
                                </div>
                            )}
                            
                            <div className="mt-3">
                                <button className="btn btn-primary me-2" onClick={runTest}>
                                    Test Again
                                </button>
                                <button className="btn btn-secondary" onClick={findWorkingKey}>
                                    Find Working Key
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ApiTest; 