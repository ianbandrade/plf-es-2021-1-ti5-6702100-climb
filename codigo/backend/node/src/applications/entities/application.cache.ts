export const applicationCacheId = {
  findAllApplications: () => 'findAllApplications',
  findApplicationById: (appId: string) => `findApplicationById${appId}`,
  findApplicationByName: (appName: string) => `findApplicationByName${appName}`,
};
