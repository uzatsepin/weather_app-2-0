<template>
  <transition name="fade">
    <div class="popup-modal" v-if="isVisible">
      <div class="popup__window">
        <div class="popup__content">
          <div class="popup__inner">
            <button class="popup__btn" @click="closeModal">X</button>
            <h3 class="popup__title">
              Ви впевнені, що хочете видалити місто
              {{ nameToDelete }} ?
            </h3>
          </div>
          <div class="popup__btns">
            <button class="popup__ok-btn" @click="deleteCard">Так</button>
            <button class="popup__cancel-btn" @click="closeModal">Ні</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalComponent",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    nameToDelete: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    deleteCard() {
      this.$emit("cardDelete");
      this.closeModal();
    },
  },
};
</script>

<style>
@import "../assets/styles/stylesComponent/popupStyle.css";
</style>
