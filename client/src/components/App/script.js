import VRuntimeTemplate from 'v-runtime-template';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    VRuntimeTemplate,
  },
  computed: {
    ...mapGetters({
      get: 'APP_GET',
      contentTemplate: 'APP_TEMPLATE',
      busy: 'WS_BUSY',
      wsClient: 'WS_CLIENT',
      actions: 'APP_ACTIONS',
      routes: 'APP_ROUTES',
    }),
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
    contentTemplate() {
      this.vApp = this.$el;
    },
    busy(v) {
      this.reactiveBusy = v;
    },
  },
  data() {
    return {
      window,
      vApp: null,
      reactiveBusy: false,
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
      return this.$refs.root.$children[0].$refs[ref];
    },
  },
  provide() {
    return {
      get: (key) => this.get(key),
      set: (key, value) => this.set(key, value),
      trigger: (name, args, kwargs) => this.trigger(name, args, kwargs),
      wsClient: this.wsClient,
      isBusy: () => this.busy,
      reactiveBusy: this.reactiveBusy,
      vApp: this.vApp,
      window: this.window,
    };
  },
  mounted() {
    this.vApp = this.$el;
    this.routes.forEach((route) => {
      this.$router.addRoute(route);
    });
  },
};
