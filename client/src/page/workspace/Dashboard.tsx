
import WorkspaceAnalytics from "@/components/workspace/workspace-analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecentProjects from "@/components/workspace/project/recent-projects";
import RecentTasks from "@/components/workspace/task/recent-tasks";
import RecentMembers from "@/components/workspace/member/recent-members";

const WorkspaceDashboard = () => {
  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Рабочая область
          </h2>
          {/* <p className="text-muted-foreground">
            Краткий обзор этой рабочей зоны.
          </p> */}
        </div>
      </div>
      <WorkspaceAnalytics />
      <div className="mt-4">
        <Tabs defaultValue="projects" className="w-full border rounded-lg p-2">
          <TabsList className="w-full justify-start border-0 bg-gray-50 px-1 h-12">
            <TabsTrigger className="py-2" value="projects">
              Мои проекты
            </TabsTrigger>
            <TabsTrigger className="py-2" value="tasks">
              Актуальные тренировки
            </TabsTrigger>
            <TabsTrigger className="py-2" value="members">
              Участники зоны
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default WorkspaceDashboard;
