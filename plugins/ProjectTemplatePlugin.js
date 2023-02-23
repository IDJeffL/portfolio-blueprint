export class ProjectTemplatePlugin {
  constructor() {}

  apply(hooks) {
    hooks.addFilter('possibleTemplatesList', 'faust', (templates, data) => {
      if (data?.seedNode?.__typename === 'Project') {
        return Array.from(new Set(['project', ...templates]));
      }

      /* Added: Custom Post Type ( Examplecpts )*/
      if (data?.seedNode?.__typename === 'Examplecpt') {
        return Array.from(new Set(['examplecpt', ...templates]));
      }

      return templates;
    });
  }
}
