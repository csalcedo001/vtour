import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Video, Users, MessageSquare, Key, Home, PlayCircle, Folder, UserPlus, Library, User, Settings, HelpCircle } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-purple-600">tavus</h1>
        </div>
        <nav className="mt-6">
          <SidebarSection title="Home" icon={Home} active />
          <SidebarSection title="VIDEO">
            <SidebarItem icon={PlayCircle} label="Video Generation" />
            <SidebarItem icon={Folder} label="Video Library" />
          </SidebarSection>
          <SidebarSection title="REPLICA">
            <SidebarItem icon={UserPlus} label="Replica Generation" />
            <SidebarItem icon={Library} label="Replica Library" />
          </SidebarSection>
          <SidebarSection title="CONVERSATION">
            <SidebarItem icon={MessageSquare} label="Create Conversation" />
            <SidebarItem icon={Folder} label="Conversation Library" />
            <SidebarItem icon={User} label="Persona Library" />
          </SidebarSection>
          <SidebarItem icon={Key} label="API Keys" />
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <Button variant="outline" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
          <Button variant="ghost" className="w-full justify-start mt-2">
            <HelpCircle className="mr-2 h-4 w-4" />
            Support
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 rounded-lg p-6 text-white mb-6">
          <span className="bg-pink-600 text-xs font-semibold px-2 py-1 rounded-full">New Product</span>
          <h1 className="text-3xl font-bold mt-2">Introducing Conversational Video</h1>
          <p className="mt-2 mb-4">You can now build live conversational experiences, with real-time digital twins that speak, see, & hear.</p>
          <Button variant="secondary">Create New Conversation</Button>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Create Video", description: "Generate a video with a replica", icon: Video, color: "text-pink-500" },
            { title: "Create Replica", description: "Clone yourself in minutes", icon: Users, color: "text-orange-500" },
            { title: "Create Conversation", description: "Talk with a replica in real-time", icon: MessageSquare, color: "text-purple-500" },
            { title: "Create API Key", description: "Start building with an API Key", icon: Key, color: "text-blue-500" },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-start p-4">
                <item.icon className={`${item.color} w-8 h-8 mb-2`} />
                <h3 className="font-semibold">{item.title} →</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stock Replicas */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Try stock replica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Nathan", context: "Conference Room" },
              { name: "Anna", context: "" },
              { name: "Jackie", context: "" },
              { name: "Laura", context: "Pink" },
            ].map((replica, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="bg-gray-200 h-40 rounded-md mb-2"></div>
                  <h3 className="font-semibold">{replica.name}{replica.context && ` - ${replica.context}`}</h3>
                  <Button variant="link" className="p-0 h-auto text-pink-500">Create →</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function SidebarSection({ title, children, icon: Icon, active }: { title: string; children?: React.ReactNode; icon?: React.ComponentType<any>; active?: boolean }) {
  return (
    <div className="mb-4">
      {Icon ? (
        <SidebarItem icon={Icon} label={title} active={active} />
      ) : (
        <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</h2>
      )}
      {children}
    </div>
  )
}

function SidebarItem({ icon: Icon, label, active }: { icon: React.ComponentType<any>; label: string; active?: boolean }) {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-2 text-sm ${
        active ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {Icon && <Icon className="h-5 w-5 mr-3" />}
      {label}
    </a>
  )
}