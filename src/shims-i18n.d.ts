import i18n from "@/i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: typeof i18n.t;
    $n: typeof i18n.n;
    $d: typeof i18n.d;
  }
}
