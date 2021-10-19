const ORIENTATION = {
  top: 'horizontal',
  bottom: 'horizontal',
  left: 'vertical',
  right: 'vertical',
};

export default {
  name: 'FloatCard',
  props: {
    handleColor: {
      type: String,
      default: '#aaa',
    },
    handlePosition: {
      type: String,
      default: 'top', // "top, left, right, bottom"
    },
    handleSize: {
      type: Number,
      default: 12,
    },
    location: {
      type: Array,
      default: () => [100, 50],
    },
    // v-cards props
    color: {
      type: String,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String],
    },
    elevation: {
      type: [Number, String],
    },
    hover: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    light: {
      type: Boolean,
      default: false,
    },
    loaderHeight: {
      type: [Number, String],
      default: 4,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: [Number, String],
    },
    maxWidth: {
      type: [Number, String],
    },
    minHeight: {
      type: [Number, String],
    },
    minWidth: {
      type: [Number, String],
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    raised: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    shaped: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
    },
  },
  data() {
    return {
      top: this.location[1],
      left: this.location[0],
    };
  },
  watch: {
    location(pos) {
      [this.left, this.top] = pos;
    },
  },
  computed: {
    positionStyle() {
      return {
        position: 'fixed',
        top: `${this.top}px`,
        left: `${this.left}px`,
      };
    },
    handleStyle() {
      const style = {
        position: 'absolute',
        cursor: 'grab',
        backgroundImage: `radial-gradient(${this.handleColor} 25%, transparent 20%), radial-gradient(${this.handleColor} 25%, transparent 20%)`,
        backgroundPosition: `-${this.handleSize / 12}px 0, ${this.handleSize /
          6}px ${this.handleSize / 4}px`,
        backgroundSize: `${this.handleSize / 2}px ${this.handleSize / 2}px`,
        backgroundRepeat: `repeat, repeat-${
          this.handlePosition in ['top', 'bottom'] ? 'x' : 'y'
        }`,
      };

      if (ORIENTATION[this.handlePosition] === 'horizontal') {
        style.backgroundRepeat = 'repeat, repeat-x';
        style.left = 0;
        style.width = `calc(100% - ${this.handleSize / 3}px)`;
        style.height = `${this.handleSize}px`;
        style.margin = `0 ${this.handleSize / 6}px`;
      } else {
        style.backgroundRepeat = 'repeat, repeat-y';
        style.top = 0;
        style.height = `calc(100% - ${this.handleSize / 3}px)`;
        style.width = `${this.handleSize}px`;
        style.margin = `${this.handleSize / 6}px 0`;
      }

      if (this.handlePosition == 'top') {
        style.top = 0;
      }
      if (this.handlePosition == 'bottom') {
        style.bottom = 0;
      }
      if (this.handlePosition == 'left') {
        style.left = 0;
      }
      if (this.handlePosition == 'right') {
        style.right = 0;
      }

      return style;
    },
  },
  created() {
    this.deltaX = 0;
    this.deltaY = 0;
    this.onMouseUp = () => {
      this.drag = false;
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
    };
    this.onMouseMove = (e) => {
      if (this.drag) {
        e.preventDefault();
        this.top = e.clientY + this.deltaY;
        this.left = e.clientX + this.deltaX;
      }
    };
    this.onMouseDown = (e) => {
      this.deltaX = this.left - e.clientX;
      this.deltaY = this.top - e.clientY;
      this.drag = true;
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    };
  },
};
