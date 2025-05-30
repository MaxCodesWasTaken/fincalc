import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  return (
    <div className="mb-6">
      <Link
        to="/"
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Home
      </Link>
    </div>
  );
}
