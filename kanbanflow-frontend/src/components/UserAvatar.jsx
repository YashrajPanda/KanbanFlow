import React from 'react';

const UserAvatar = ({ user, className = '' }) => {
    if (!user) return null;

    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    // Generate a consistent pseudo-random color based on name length/chars
    const colors = [
        'bg-blue-500', 'bg-fuchsia-500', 'bg-purple-500', 'bg-indigo-500',
        'bg-pink-500', 'bg-rose-500', 'bg-teal-500', 'bg-emerald-500'
    ];

    const colorIndex = user.name ? user.name.length % colors.length : 0;

    return (
        <div
            className={`relative flex items-center justify-center rounded-full text-white font-bold text-xs ring-2 ring-slate-800 shadow-md ${colors[colorIndex]} ${className}`}
            title={user.name}
        >
            {initials}
            {user.role && (
                <span className="sr-only">, Role: {user.role}</span>
            )}
        </div>
    );
};

export default UserAvatar;
