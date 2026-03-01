export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-3xl shadow-sm border border-slate-200">
      <h1 className="text-2xl font-black text-slate-800 mb-6">Profile</h1>

      <div className="space-y-6">
        {/* Header/Hero Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6">
          <div className="relative">
            <img 
              src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" 
              className="rounded-full h-24 w-24 object-cover ring-4 ring-amber-50" 
              alt="profile"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bishal Gaihre</h2>
            <p className="text-amber-600 font-medium">User</p>
            <p className="text-slate-500 text-sm flex items-center mt-1">
              <span className="mr-1">📍</span> Kalanki, Kathmandu
            </p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Personal Information</h3>
            <button className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-white font-medium transition-all text-sm">
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoBlock label="First Name" value="Bishal" />
            <InfoBlock label="Last Name" value="Gaihre" />
            <InfoBlock label="Date Of Birth" value="17-11-2007" />
            <InfoBlock label="Email Address" value="bishalgaihre4@gmail.com" />
            <InfoBlock label="Phone Number" value="+977 9861254179" />
            <InfoBlock label="Role" value="User" />
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Address</h3>
            <button className="px-4 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium transition-all text-sm">
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoBlock label="Country" value="United Kingdom" />
            <InfoBlock label="City" value="Leeds, East London" />
            <InfoBlock label="Postal Code" value="47700" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component to keep the code DRY (Don't Repeat Yourself)
function InfoBlock({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-slate-900 font-medium">{value}</p>
    </div>
  );
}