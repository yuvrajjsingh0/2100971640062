// import { DocumentQuery, Document } from 'mongoose';

// interface QueryString {
//     keyword?: string;
//     page?: string;
//     limit?: string;
//     [key: string]: any;
// }

// class ApiFeatures {
//     query: DocumentQuery<Document[], Document>;
//     queryStr: QueryString;

//     constructor(query: DocumentQuery<Document[], Document>, queryStr: QueryString) {
//         this.query = query;
//         this.queryStr = queryStr;
//     }

//     search(): this {
//         const keyword = this.queryStr.keyword ? {
//             name: {
//                 $regex: this.queryStr.keyword,
//                 $options: "i",
//             }
//         } : {};

//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

//     filter(): this {
//         const queryCopy = { ...this.queryStr };

//         // Remove some fields for category
//         const removeFields = ["keyword", "page", "limit"];
//         removeFields.forEach((key) => delete queryCopy[key]);

//         // Filter for Price and Rating
//         let queryStr = JSON.stringify(queryCopy);
//         queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

//         this.query = this.query.find(JSON.parse(queryStr));
//         return this;
//     }

//     pagination(resultPerPage: number): this {
//         const currentPage = Number(this.queryStr.page) || 1;
//         const skip = resultPerPage * (currentPage - 1);

//         this.query = this.query.limit(resultPerPage).skip(skip);
//         return this;
//     }
// }

// export default ApiFeatures;


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

        if (queryCopy.price) {
            const price = queryCopy.price;
            if (price.gte) this.query = this.query.filter(product => product.price >= price.gte);
            if (price.lte) this.query = this.query.filter(product => product.price <= price.lte);
        }

        if (queryCopy.rating) {
            const rating = queryCopy.rating;
            if (rating.gte) this.query = this.query.filter(product => product.rating >= rating.gte);
            if (rating.lte) this.query = this.query.filter(product => product.rating <= rating.lte);
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