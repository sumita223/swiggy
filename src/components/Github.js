const Github = () => {
    const githubUrl = "https://github.com/sumita223";
    return (
        <div className="github-profile bg-gray-100 text-center py-6 px-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect with Me</h2>
            <p className="text-gray-600 text-xl mb-6"> {/* Increased font size here */}
                Check out my projects and contributions on GitHub.
            </p>
            <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
                Visit My GitHub Profile
            </a>
        </div>
    );
};

export default Github;
