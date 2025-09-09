import { Link } from '@inertiajs/react'; 

export default function Pagination({ links }) {
    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                preserveScroll
                    key={link.label}
                    href={link.url || '#'}
                    className={
                        "inline-block px-3 py-1 mx-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md " +
                        (link.active ? " font-bold bg-gray-200 " : "") +
                        (!link.url ? " text-gray-500 cursor-not-allowed " : " hover:bg-gray-950 ")
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </nav>
    );
}
