interface QueryString {
    keyword?: string;
    page?: string;
    limit?: string;
    [key: string]: any;
}

class ApiFeatures {
    query: any[];
    queryStr: QueryString;

    constructor(query: any[], queryStr: QueryString) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search(): this {
        const keyword = this.queryStr.keyword ? this.queryStr.keyword.toLowerCase() : "";
        if (keyword) {
            this.query = this.query.filter(product =>
                product.productName.toLowerCase().includes(keyword)
            );
        }
        return this;
    }

    filter(): this {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach(key => delete queryCopy[key]);

        console.log(queryCopy);

        if (queryCopy.priceLower || queryCopy.priceUpper) {
            console.log("Filter by price", queryCopy);
            if (queryCopy.priceLower) this.query = this.query.filter(product => product.price >= queryCopy.priceLower);
            if (queryCopy.priceUpper) this.query = this.query.filter(product => product.price <= queryCopy.priceUpper);
        }

        if (queryCopy.ratingLower || queryCopy.ratingUpper) {
            if (queryCopy.ratingLower) this.query = this.query.filter(product => product.rating >= queryCopy.ratingLower);
            if (queryCopy.ratingUpper) this.query = this.query.filter(product => product.rating <= queryCopy.ratingUpper);
        }

        if(queryCopy.availability){
            this.query = this.query.filter(product => product.availability == queryCopy.availability);
        }

        if (queryCopy.discountLower || queryCopy.discountUpper) {
            if (queryCopy.discountLower) this.query = this.query.filter(product => product.discount >= queryCopy.discountLower);
            if (queryCopy.discountUpper) this.query = this.query.filter(product => product.discount <= queryCopy.discountUpper);
        }

        return this;
    }

    sort(): this {
        if (this.queryStr.sort) {
            const sortFields = this.queryStr.sort.split(',').map((field: string) => field.trim());
            this.query.sort((a, b) => {
                for (let field of sortFields) {
                    const [key, order] = field.split('[');
                    const direction = order?.charAt(0) === 'h' ? -1 : 1;
                    if (a[key] < b[key]) return -1 * direction;
                    if (a[key] > b[key]) return 1 * direction;
                }
                return 0;
            });
        }
        return this;
    }

    pagination(resultPerPage: number): this {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.slice(skip, skip + resultPerPage);
        return this;
    }
}

export default ApiFeatures;