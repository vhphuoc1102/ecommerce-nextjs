const GHN_TOKEN = process.env.GHN_TOKEN;

export async function getProvinces() {
  const headers: HeadersInit = {};
  if (GHN_TOKEN) {
    headers['token'] = GHN_TOKEN;
  }

  const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
    headers: headers
  });
  return (await response.json()).data.map((province) => {
    const { ProvinceID, ProvinceName } = province;
    return { provinceId: ProvinceID, provinceName: ProvinceName };
  })
}

export async function getDistricts(provinceId: number) {
  const headers: HeadersInit = {};
  if (GHN_TOKEN) {
    headers['token'] = GHN_TOKEN;
    headers['province_id'] = provinceId.toString();
  }

  const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
    headers: headers
  });

  return (await response.json()).data.map((district) => {
    const { DistrictID, DistrictName } = district;
    return { districtId: DistrictID, districtName: DistrictName };
  });
}

export async function getWards(districtId: number) {
  const headers: HeadersInit = {};
  if (GHN_TOKEN) {
    headers['token'] = GHN_TOKEN;
    headers['district_id'] = districtId.toString();
  }

  const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
    headers: headers
  });

  return (await response.json()).data.map((ward) => {
    const {WardCode, WardName} = ward;
    return {wardCode: WardCode, wardName: WardName};
  });
}
