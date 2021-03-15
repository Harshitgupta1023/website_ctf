import { glide, fade } from "react-tiger-transition";

// inject the generated styles in the document:

glide({
  name: "default-glide-left",
});

fade({
  name: "default-fade",
});

glide({
  name: "default-glide-right",
  direction: "right",
});
