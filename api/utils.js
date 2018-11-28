const filterPayload = (payload)=>{
  const filterArr = payload.filter(data => data.drm && data.episodeCount > 0);
  const mapPayload = filterArr.map(data =>{ 
    const { image: { showImage }, slug, title } = data;
    return { image: showImage, slug, title }
  })
  return mapPayload
}

module.exports = filterPayload