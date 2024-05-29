import React from "react";
const Footer: React.FC = () => {
    return (
        <footer className="advanced-footer">
            <div className="footer-content">
                <p>&copy; 2024 Your Company Name</p>
                <div className="social-links">
                    <a href="#">Facebook</a>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                </div>
            </div>
            <div className="form-section">
                <input type="email" placeholder="Subscribe to our newsletter" />
                <button>Subscribe</button>
            </div>
        </footer>
    )
};
export default Footer