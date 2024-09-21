import { useParams, Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePackageDetail } from "../hooks/usePackageDetail";
import { Maintainer } from "../types/detailPackageTypes";
import Loader from "../components/Loader";
import { useEffect } from "react";

const PackageDetailPage = () => {
  const { name, version } = useParams();

  // Custom hook to fetch package details
  const { data, isLoading, error } = usePackageDetail(name, version);

  // Function to copy text to clipboard with success/error notifications
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!", {
          autoClose: 1500,
        });
      })
      .catch(() =>
        toast.error("Failed to copy text.", {
          autoClose: 1500,
        })
      );
  };

  useEffect(() => {
    if (name) {
      document.title = `${name} - npm`;
    }
  }, [name]);

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <Loader />
      ) : error || !data ? (
        <p>Package not found</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <p className="text-lg text-gray-700 mt-2">{data.description}</p>
            <p className="text-sm text-gray-500">
              Version: {version || data["distTags"]?.latest}
            </p>

            <div className="mt-6">
              <h2 className="text-3xl font-semibold mb-2">Readme</h2>
              {data.readme ? (
                <MarkdownPreview
                  source={data.readme}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "16px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  className="prose prose-lg"
                  components={{
                    code: ({ ...props }) => (
                      <pre className="!bg-gray-100">
                        <code {...props} className="text-gray-800 !text-lg" />
                      </pre>
                    ),
                  }}
                />
              ) : (
                <p>No README available.</p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Maintainers</h2>
              <ul className="mt-2">
                {data.maintainers && data.maintainers.length > 0 ? (
                  data.maintainers.map((maintainer: Maintainer) => (
                    <li key={maintainer.email} className="text-gray-600">
                      {maintainer.name} ({maintainer.email})
                    </li>
                  ))
                ) : (
                  <p>No maintainers available.</p>
                )}
              </ul>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Additional Information</h2>
              <p className="mt-2">License: {data.license}</p>
              <p className="mt-1">
                Homepage: {data.homepage || "Not available"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 shadow rounded-md">
              <h3 className="text-lg font-semibold">Installation</h3>
              <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md mt-2">
                <code className="text-gray-800">npm install {data.name}</code>
                <button
                  onClick={() => copyToClipboard(`npm install ${data.name}`)}
                  className="ml-2 text-gray-500 hover:text-gray-800"
                  aria-label="Copy to clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12H8m0 0v8m0-8V4m4 16H8a2 2 0 01-2-2V4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="bg-white p-4 shadow rounded-md">
              <h3 className="text-lg font-semibold">Repository</h3>
              {data.repository?.url ? (
                <a
                  href={data.repository.url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.repository.url}
                </a>
              ) : (
                <p>No repository available</p>
              )}
            </div>

            {!version && (
              <div className="bg-white p-4 shadow rounded-md h-56">
                <h3 className="text-lg font-semibold">Versions</h3>
                <ul className="overflow-y-scroll no-scrollbar h-40">
                  {Object.keys(data.versions).map((version) => (
                    <li key={version} className="text-gray-600">
                      <Link
                        to={`/package/${data.name}/${version}`}
                        className="text-blue-500 hover:underline"
                      >
                        {version}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default PackageDetailPage;
