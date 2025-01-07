// geo-hash-helper.ts
class GeoHashHelper {
    private static readonly BITS: number[] = [16, 8, 4, 2, 1];

    private static readonly BASE32: string = "0123456789bcdefghjkmnpqrstuvwxyz";

    private static readonly NEIGHBORS: { [key: string]: { [key: string]: string } } = {
        right: {even: "bc01fg45238967deuvhjyznpkmstqrwx"},
        left: {even: "238967debc01fg45kmstqrwxuvhjyznp"},
        top: {even: "p0r21436x8zb9dcf5h7kjnmqesgutwvy"},
        bottom: {even: "14365h7k9dcfesgujnmqp0r2twvyx8zb"}
    };

    private static readonly BORDERS: { [key: string]: { [key: string]: string } } = {
        right: {even: "bcfguvyz"},
        left: {even: "0145hjnp"},
        top: {even: "prxz"},
        bottom: {even: "028b"}
    };

    static init(): void {
        // Initialize odd properties for NEIGHBORS and BORDERS
        this.NEIGHBORS.bottom.odd = this.NEIGHBORS.left.even;
        this.NEIGHBORS.top.odd = this.NEIGHBORS.right.even;
        this.NEIGHBORS.left.odd = this.NEIGHBORS.bottom.even;
        this.NEIGHBORS.right.odd = this.NEIGHBORS.top.even;

        this.BORDERS.bottom.odd = this.BORDERS.left.even;
        this.BORDERS.top.odd = this.BORDERS.right.even;
        this.BORDERS.left.odd = this.BORDERS.bottom.even;
        this.BORDERS.right.odd = this.BORDERS.top.even;
    }

    private static refine_interval(interval: number[], cd: number, mask: number): void {
        if (cd & mask)
            interval[0] = (interval[0] + interval[1]) / 2;
        else
            interval[1] = (interval[0] + interval[1]) / 2;
    }

    public static calculateAdjacent(srcHash: string, dir: string): string {
        srcHash = srcHash.toLowerCase();
        const lastChr: string = srcHash.charAt(srcHash.length - 1);
        const type: string = (srcHash.length % 2) ? 'odd' : 'even';
        let base: string = srcHash.substring(0, srcHash.length - 1);

        if (this.BORDERS[dir][type].indexOf(lastChr) !== -1) {
            base = this.calculateAdjacent(base, dir);
        }

        return base + this.BASE32[this.NEIGHBORS[dir][type].indexOf(lastChr)];
    }

    /**
     * 编码
     *
     * @param longitude 经度
     * @param latitude 纬度
     * @param precision 精度
     */
    public static encode(longitude: number, latitude: number, precision: number): string {
        let is_even: boolean = true; // 偶数标记
        let bit: number = 0;
        let ch: number = 0;
        let geohash: string = "";

        let lon: number[] = [-180.0, 180.0];
        let lat: number[] = [-90.0, 90.0];

        while (geohash.length < precision) {
            let mid: number;
            if (is_even) {
                mid = (lon[0] + lon[1]) / 2;
                if (longitude > mid) {
                    ch |= GeoHashHelper.BITS[bit];
                    lon[0] = mid;
                } else {
                    lon[1] = mid;
                }
            } else {
                mid = (lat[0] + lat[1]) / 2;
                if (latitude > mid) {
                    ch |= GeoHashHelper.BITS[bit];
                    lat[0] = mid;
                } else {
                    lat[1] = mid;
                }
            }
            is_even = !is_even;
            if (bit < 4) {
                bit++;
            } else {
                geohash += GeoHashHelper.BASE32[ch];
                bit = 0;
                ch = 0;
            }
        }
        return geohash;
    }

    /**
     * 解码
     *
     * @param geohash
     */
    public static decode(geohash: string): { longitude: number[], latitude: number[] } {
        let is_even: boolean = true;
        let lon: number[] = [-180.0, 180.0];
        let lat: number[] = [-90.0, 90.0];
        let lon_err: number = 180.0;
        let lat_err: number = 90.0;

        for (let i: number = 0; i < geohash.length; i++) {
            let c: string = geohash[i];
            let cd: number = this.BASE32.indexOf(c);
            for (let j: number = 0; j < 5; j++) {
                let mask: number = this.BITS[j];
                if (is_even) {
                    lon_err /= 2;
                    this.refine_interval(lon, cd, mask);
                } else {
                    lat_err /= 2;
                    this.refine_interval(lat, cd, mask);
                }
                is_even = !is_even;
            }
        }
        return {
            longitude: lon,
            latitude: lat
        };
    }
}

// Initialize the odd properties for NEIGHBORS and BORDERS
GeoHashHelper.init();

export default GeoHashHelper;
