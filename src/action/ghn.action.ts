"use server"
const ghnToken = process.env.GHN_TOKEN;

export async function getProvinces() {
  const headers: HeadersInit = {};
  console.log(ghnToken);
  if (ghnToken) {
    headers['token'] = ghnToken;
  }

  const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
    headers: headers
  });
  const body = await response.json();
  if (!body.data) {
    return [];
  }
  return body.data.map((province: any) => {
    const { ProvinceID, ProvinceName } = province;
    return { provinceId: ProvinceID, provinceName: ProvinceName };
  });
}

export async function getDistricts(provinceId: string) {
  console.log(provinceId);
  const headers: HeadersInit = {};
  if (ghnToken) {
    headers['token'] = ghnToken;
    headers['province_id'] = provinceId;
  }

  const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district', {
    headers: headers
  });

  const body = await response.json();
  if (!body.data) {
    return [];
  }
  const districts = body.data.map((district: { DistrictID: number, DistrictName: string }) => {
    const { DistrictID, DistrictName } = district;
    return { districtId: DistrictID, districtName: DistrictName };
  });

  // Move district with districtId 1566 to the top // TODO: For test only
  // const districts = districts.sort((a, b) => {
  //   if (a.districtId === 1566) return -1;
  //   if (b.districtId === 1566) return 1;
  //   return 0;
  // });

  return districts;
}

export async function getWards(districtId: string) {
  const headers: HeadersInit = {};
  if (ghnToken) {
    headers['token'] = ghnToken;
    headers['district_id'] = districtId;
  }

  const response = await fetch('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
    headers: headers
  });

  const body = await response.json();
  if (!body.data) {
    return [];
  }
  return body.data.map((ward: any) => {
    const { WardCode, WardName } = ward;
    return { wardCode: WardCode, wardName: WardName };
  });
}
