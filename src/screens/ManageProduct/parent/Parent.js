import React from 'react'
import ProductTitle from './ProductTitle'
import ProductIdentifiers from './ProductIdentifiers'
import ProductDescription from './ProductDescription'
import ProductImages from './ProductImages'
import ProductOptions from './ProductOptions'
import ProductAttributes from './ProductAttributes'
import CustomFields from './CustomFields'
import ProductParent from './ProductParent'

const Parent = () => {
    return (
        <div className='product__container'>
            {/* Left Div */}
            <div className="left">
                <div className="product__header">
                    <h3>
                        PARENT SKU : <strong>GU7761-D_32F</strong>
                    </h3>
                    <div className="product__header2">
                        <h3 className='text-lg-center'>
                            <strong>1/1</strong>
                        </h3>
                        <p>Variants In Stock</p>
                    </div>
                </div>

                <ProductTitle />

                {/* Identifiers */}
                <ProductIdentifiers />

                {/* Description */}
                <ProductDescription />

                {/* Image */}
                <ProductImages />

                {/* Options */}
                <ProductOptions />

                {/* Attributes */}
                <ProductAttributes />

                {/* Custom Fields */}
                <CustomFields />
            </div>

            {/* Right Div */}
            <div className="right">
                <ProductParent />
            </div>
        </div>
    )
}

export default Parent