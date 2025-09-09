// resources/js/Components/ApplicationLogo.jsx
export default function ApplicationLogo({ className }) {
    return (
        <svg
            className={className}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="50" cy="50" r="48" stroke="#10B981" strokeWidth="4" />
            <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill="#10B981"
                fontSize="30"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
            >
                N T P
            </text>
        </svg>
    );
}
