module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

type Interval = NodeJS.Timer | number;
type Timeout = NodeJS.Timeout | number;
type Func = () => void;
