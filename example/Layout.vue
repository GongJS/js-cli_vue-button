<template>
  <div class="my-vuelive">
    <div class="my-vuelive-editor">
      <slot name="editor"></slot>
    </div>
    <div class="my-vuelive-preview">
      <slot name="preview"></slot>
    </div>
  </div>
</template>
<style>
.my-vuelive {
  border-radius: 10px;
  display: flex;
}

.my-vuelive-editor {
  background: rgb(50, 42, 56);
  font-family: "Source Code Pro", monospace;
  font-size: 0.875rem;
  height: 21.875rem;
  max-height: 21.875rem;
  overflow: auto;
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
}

.my-vuelive-preview {
  position: relative;
  padding: 0.5rem 0px;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  text-align: center;
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
}
</style>
