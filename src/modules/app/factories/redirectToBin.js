function redirectToBinFactory(keyTag) {
  function redirectToBin({ router, resolve }) {
    const key = resolve.value(keyTag);

    router.redirect(`/bins/${key}`);
  }

  return redirectToBin;
}

export default redirectToBinFactory;
