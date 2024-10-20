import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, Copy, Home, Image, MessageSquare, Settings, Users, Video } from "lucide-react"

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-16 bg-white p-3 flex flex-col items-center space-y-4 border-r border-gray-200">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Home className="h-6 w-6 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-pink-100">
          <Video className="h-6 w-6 text-pink-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Image className="h-6 w-6 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageSquare className="h-6 w-6 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Users className="h-6 w-6 text-gray-500" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold text-gray-800">Video Generation</h1>
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">POST</span>
            <span className="text-sm text-gray-500">/v2/videos</span>
          </div>
          <Button variant="outline" className="text-gray-600">Read Docs</Button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-sm h-full">
            <CardContent className="p-6">
              <h2 className="mb-4 text-sm font-medium text-gray-500">Input</h2>
              <div className="space-y-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Nathan - Conference Room (default)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nathan">Nathan - Conference Room (default)</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 bg-white border-gray-300 text-gray-700 font-normal">
                    <Copy className="mr-2 h-4 w-4" />
                    Script to Video
                  </Button>
                  <Button variant="outline" className="flex-1 bg-white border-gray-300 text-gray-400 font-normal">
                    Audio to Video
                  </Button>
                </div>
                <Textarea placeholder="Type your text here" className="min-h-[200px] resize-none" />
                <div className="flex items-center justify-between">
                  <Button variant="link" className="px-0 text-gray-600">
                    Additional Settings
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  <Button className="bg-pink-500 hover:bg-pink-600">Generate →</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-500">Preview</h2>
                <Tabs defaultValue="video" className="w-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="video" className="text-xs">Video</TabsTrigger>
                    <TabsTrigger value="code" className="text-xs">Code</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="aspect-video bg-gray-100 mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://example.com/random-preview-image.jpg"
                  alt="Video preview"
                  className="w-full h-full object-cover"
                />
                <div className="bg-black bg-opacity-50 text-white text-sm p-2 absolute bottom-0 left-0 right-0">
                  In preview mode, sound and face animations are off
                </div>
              </div>
              <h3 className="font-medium text-sm mb-2 text-gray-700">Generated Videos</h3>
              <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500 border border-gray-200">
                <Video className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                <p className="text-sm">Your generated videos will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}