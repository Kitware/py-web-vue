import VRuntimeTemplate from 'v-runtime-template';
import { mapGetters, mapActions } from 'vuex';
import { generateModels } from '../../store/app';

export default {
  name: 'App',
  components: {
    VRuntimeTemplate,
  },
  computed: {
    ...generateModels(),
    ...mapGetters({
      get: 'APP_GET',
      contentTemplate: 'APP_TEMPLATE',
      wsClient: 'WS_CLIENT',
      actions: 'APP_ACTIONS',
      routes: 'APP_ROUTES',
      tts: 'APP_TEMPLATE_TS',
    }),
    rootComponent() {
      if (this.contentTemplate.startsWith('#')) {
        return this.contentTemplate.substring(1);
      }
      return 'v-runtime-template';
    },
  },
  watch: {
    actions(list) {
      for (let i = 0; i < list.length; i++) {
        const action = list[i];
        const { ref, type } = action;
        if (type === 'method') {
          const { method, args } = action;
          this.getRef(ref)[method](...args);
        }
        if (type === 'property') {
          const { property, value } = action;
          this.getRef(ref)[property] = value;
        }
      }
      this.clearActions();
    },
  },
  data() {
    return {
      window,
    };
  },
  methods: {
    ...mapActions({
      serverSet: 'APP_SET',
      serverTrigger: 'APP_TRIGGER',
      clearActions: 'APP_ACTIONS_PROCESSED',
    }),
    set(key, value) {
      this.serverSet({ key, value });
    },
    trigger(name, args, kwargs) {
      this.serverTrigger({ name, args, kwargs });
    },
    getRef(ref) {
      const { root } = this.$refs;
      if (root.$refs && root.$refs[ref]) {
        return root.$refs[ref];
      }
      return root.$children[0].$refs[ref];
    },
  },
  provide() {
    return {
      get: (key) => this.get(key),
      set: (key, value) => this.set(key, value),
      trigger: (name, args, kwargs) => this.trigger(name, args, kwargs),
      wsClient: this.wsClient,
      isBusy: () => this.busy,
      window: this.window,
    };
  },
  mounted() {
    this.routes.forEach((route) => {
      this.$router.addRoute(route);
    });
  },
};
