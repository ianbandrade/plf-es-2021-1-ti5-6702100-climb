import {
  BasicRepository,
  RepositoriesList,
  Repository,
} from "../interfaces/repositories-organization-list";

const ropsitoriesNamesToList = (repositories: BasicRepository[]) => {
  const map = new Map<string, BasicRepository[]>();

  repositories.forEach(({ name: completeName, isEmpty }) => {
    const [org, name] = completeName.split("/", 2);
    const orgRepos = map.get(org);

    if (!orgRepos) return map.set(org, [{ name, isEmpty }]);

    orgRepos.push({ name, isEmpty });
  });

  const organizations: RepositoriesList = { organizations: [] };

  map.forEach((repositories, name) => {
    organizations.organizations.push({
      name,
      repositories,
    });
  });
  return organizations;
};

export { ropsitoriesNamesToList };
