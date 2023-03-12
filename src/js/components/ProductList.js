import { $ } from "../utils/querySelector.js";
import useHttp from "../utils/useHttp.js";
import "../../css/components/productList.css";

export default class ProductList {
    constructor($main) {
        if (!$main) {
            this.render();
        }
    }

    eachItem(item) {
        const $li = document.createElement("li");
        $li.setAttribute("class", "product");

        const $a = document.createElement("a");
        $a.setAttribute("href", `/item/${item.product_id}`);
        
        const $img = document.createElement("img");
        $img.setAttribute("width", "380");
        $img.setAttribute("height", "380");
        $img.setAttribute("src", item.image);
        $img.setAttribute("alt", `${item.product_name}`);
        $a.appendChild($img);

        const $storeName = document.createElement("p");
        $storeName.setAttribute("class", "store-name");
        $storeName.textContent = item.store_name;
        $a.appendChild($storeName);

        const $h2 = document.createElement("h2");
        $h2.textContent = item.product_name;
        $a.appendChild($h2);

        const $price = document.createElement("p");
        $price.setAttribute("class", "price");
        $price.textContent = `${item.price.toLocaleString()}원`;
        $a.appendChild($price);

        $li.appendChild($a);

        return $li;
    }

    async renderItems(query) {
        const queryInUrl = query ? `/products${query}` : "/products";
        await useHttp({url: queryInUrl}, (items) => {
            this.query = items.next ? items.next.split("products")[1] : null;
            const docFrag = new DocumentFragment();

            items.results.forEach((item) => {
                docFrag.appendChild(this.eachItem(item));
            });

            this.$productList.appendChild(docFrag);
        });
    }

    async render() {
        const $main = document.createElement("main");
        $main.setAttribute("class", "main");
        const $productList = document.createElement("ul");
        $productList.setAttribute("class", "product-list");
        this.$productList = $productList;
        $main.appendChild($productList);
        $("#app").appendChild($main);
        
        await this.renderItems();

        const io = new IntersectionObserver(async (entries, observer) => {
            const ioTarget = entries[0].target;

            if (this.query) {
                if (entries[0].isIntersecting) {
                    io.unobserve($productList.lastElementChild);

                    await this.renderItems(this.query);
    
                    io.observe($productList.lastElementChild);
                }
            } else {
                io.unobserve($productList.lastElementChild);
            }
        }, {
            threshold: 0.5
        });

        io.observe($productList.lastElementChild);
    }
}