import { Link } from "react-router-dom";
import { Package, Score } from "../types/searchDataTypes";

interface PackageListItemProps {
  packageData: Package;
  scoreData: Score;
}

const PackageListItem = ({ packageData, scoreData }: PackageListItemProps) => {
  const { name, description, publisher, keywords, date } = packageData;
  const { detail } = scoreData;

  return (
    <Link to={`/package/${name}`}>
      <div className="py-4 border-b border-gray-300 flex justify-between">
        <div className="w-[80%]">
          <div className="text-lg font-semibold text-blue-600 hover:underline">
            {name}
          </div>
          <div className="text-sm text-gray-500">{description}</div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords?.map((tag) => (
              <span
                key={tag}
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Author and date */}
          <div className="text-sm text-gray-400 mt-2">
            Published by{" "}
            <span className="text-gray-600">{publisher?.username}</span> on{" "}
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Score bars for Popularity, Quality, Maintenance */}
        <div className="flex flex-col justify-center space-y-2 w-32">
          <div className="w-full">
            <p className="text-xs">Popularity</p>
            <div className="bg-gray-300 h-1 rounded-full">
              <div
                className="bg-cyan-500 h-1 rounded-full"
                style={{ width: `${detail?.popularity * 100}%` }}
              />
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs">Quality</p>
            <div className="bg-gray-300 h-1 rounded-full">
              <div
                className="bg-violet-500 h-1 rounded-full"
                style={{ width: `${detail?.quality * 100}%` }}
              />
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs">Maintenance</p>
            <div className="bg-gray-300 h-1 rounded-full">
              <div
                className="bg-red-700 h-1 rounded-full"
                style={{ width: `${detail?.maintenance * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PackageListItem;
